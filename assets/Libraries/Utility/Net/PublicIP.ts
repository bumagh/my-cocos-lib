import { sys } from 'cc';
export class PublicIP {
    /**
     * 通过第三方服务获取公网IP
     */
    public static async getPublicIP(): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!sys.isBrowser) {
                resolve('127.0.0.1');
                return;
            }

            // 使用多个服务提高成功率
            const services = [
                'https://api.ipify.org?format=json',
                'https://api4.my-ip.io/ip.json',
                'https://ipinfo.io/json'
            ];

            let currentService = 0;

            const tryNextService = () => {
                if (currentService >= services.length) {
                    reject(new Error('All services failed'));
                    return;
                }

                const xhr = new XMLHttpRequest();
                xhr.open('GET', services[currentService]);
                xhr.timeout = 5000;
                
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        try {
                            const data = JSON.parse(xhr.responseText);
                            const ip = data.ip || data.ip_address;
                            if (ip) {
                                resolve(ip);
                            } else {
                                tryNextService();
                            }
                        } catch {
                            tryNextService();
                        }
                    } else {
                        tryNextService();
                    }
                };
                
                xhr.ontimeout = tryNextService;
                xhr.onerror = tryNextService;
                
                xhr.send();
                currentService++;
            };

            tryNextService();
        });
    }
}