import { sys } from "cc";
import { BaseBridge } from "./BaseBridge";

export class UniappBridge extends BaseBridge
{

  private static instance: UniappBridge;
  private messageHandlers: Map<string, Function[]> = new Map();
  private messageCallbacks: ( ( data: any ) => void )[] = [];

  public static getInstance (): UniappBridge
  {
    if ( !this.instance )
    {
      this.instance = new UniappBridge();
    }
    return this.instance;
  }
  constructor ()
  {
    super();
    this.Init();
  }
  Init ()
  {
    // 初始化消息监听
    this.setupMessageListeners();
    console.log( "初始化消息监听" );
  }
  private setupMessageListeners ()
  {
    if ( sys.isBrowser )
      window.addEventListener( "message", this.handleWindowMessage.bind( this ) );
  }
  Send ( message: any ): void { }
  private handleWindowMessage ( event: MessageEvent )
  {
    try
    {
      const data = event.data;
      if ( data )
      {
        this.dispatchMessage( data.type, data.payload );
      }
    } catch ( error )
    {
      console.error( '处理消息失败:', error );
    }
  }

  // 分发消息
  private dispatchMessage ( type: string, payload: any )
  {
    const handlers = this.messageHandlers.get( type );
    if ( handlers )
    {
      handlers.forEach( handler =>
      {
        try
        {
          handler( payload );
        } catch ( error )
        {
          console.error( `处理消息 ${ type } 失败:`, error );
        }
      } );
    }
  }

  OnMessage ( type: string, handler: Function ): void
  {
    if ( !this.messageHandlers.has( type ) )
    {
      this.messageHandlers.set( type, [] );
    }
    this.messageHandlers.get( type )!.push( handler );
  }
}
