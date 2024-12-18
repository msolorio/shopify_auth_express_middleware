import '@shopify/shopify-api/adapters/node';
import { AbstractSessionStore } from '#app/shopifyAuth/sessionStore';
import { ShopifyAuthRouter } from '#app/shopifyAuth/router'
import { ShopifyAuthOptions } from './types'

export * from '#app/shopifyAuth/sessionStore';

export const ShopifyAuth = function (options: ShopifyAuthOptions) {
  return new _ShopifyAuth(options);
}

class _ShopifyAuth {
  private _sessionStore: AbstractSessionStore;
  private _authRouter: ShopifyAuthRouter;

  constructor(options: ShopifyAuthOptions) {
    this._sessionStore = options.sessionStore;
    this._authRouter = new ShopifyAuthRouter({
      api: options.api,
      authPaths: options.authPaths,
      sessionStore: this._sessionStore
    })
  }

  public async getAccessToken(shopName: string) {
    const shop = await this._sessionStore.get(shopName);
    return String(shop && shop.accessToken);
  }

  public router() {
    return this._authRouter.create();
  }
}

