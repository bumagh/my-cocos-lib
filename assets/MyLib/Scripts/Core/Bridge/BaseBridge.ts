export abstract class BaseBridge
{
    protected bridgeName: string;

    abstract Send ( message: any ): void;
    abstract Init (): void;
    abstract OnMessage ( type: string, handler: Function ): void;

    protected validateMessage ( message: any ): boolean
    {
        return message && typeof message === 'object';
    }
}