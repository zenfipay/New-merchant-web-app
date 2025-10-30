declare module "next-pwa" {
  import { NextConfig } from "next";

  /**
   * Common handler names used by next-pwa/workbox strategies.
   * You can extend this union if you use custom handlers.
   */
  type RequestHandler = 'CacheFirst' | 'NetworkFirst' | 'StaleWhileRevalidate' | 'CacheOnly' | 'NetworkOnly' | string;

  /**
   * Describes a single runtimeCaching entry.
   * - urlPattern: string or RegExp to match requests
   * - handler: either a named strategy or a custom async handler
   * - method: HTTP method (usually GET)
   * - options: optional strategy-specific options
   */
  interface RuntimeCachingEntry {
    urlPattern: RegExp | string;
    handler: RequestHandler | ((params: { request: Request; event?: ExtendableEvent }) => Promise<Response | undefined>);
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | string;
    options?: Record<string, unknown>;
  }

  interface PWAOptions {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    buildExcludes?: string[];
    runtimeCaching?: RuntimeCachingEntry[];
  }

  function withPWA(options?: PWAOptions): (config: NextConfig) => NextConfig;

  export default withPWA;
}
