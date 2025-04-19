declare global {
  namespace App {
    interface Platform {
      env: {
        BIB: {
          search(isbn: string): Promise<Response>;
        };
        STYLE: {
          resolveName(name: string): Promise<string>;
          getStyle(name: string): Promise<any>;
        };
      };
    }
  }
}
