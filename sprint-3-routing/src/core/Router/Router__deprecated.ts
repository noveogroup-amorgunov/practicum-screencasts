// Роутер из теории

class Block {
  getContent() { }
  
  show() {
    console.log('show');
  }
  
  hide() {
    console.log('hide');
  }
}

class Chats extends Block {
  getContent() {
    return 'chats';
  }
  
  show() {
    console.log('show chats');
  }
  
  hide() {
    console.log('hide chats');
  }
}

class Users extends Block {
  getContent() {
    return 'users';
  }
  
  show() {
    console.log('show users');
  }
  
  hide() {
    console.log('hide users');
  }
}

function isEqual(lhs, rhs) {
  return lhs === rhs;
}

function render(query, block) {
  const root = document.querySelector(query);
  root.textContent = block.getContent();
  return root;
}

class Route {
    _pathname: any;
    _blockClass: any;
    _block: any;
    _props: any;

    constructor(pathname, view, props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}

class Router {
    routes: any
    history: any
    _currentRoute: any
    _rootQuery: any

    static __instance: any

    constructor(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname, block) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);
      return this;
    }

    start() {
      window.onpopstate = event => {
      this._onRoute(event.currentTarget.location.pathname);
        };

      this._onRoute(window.location.pathname);
    }

    _onRoute(pathname) {
        const route = this.getRoute(pathname);

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        route.render(route, pathname);
    }

    go(pathname) {
      this.history.pushState({}, '', pathname);
      this._onRoute(pathname);
    }

    back() {
      this.history.back();
      // this.go(window.location.pathname);
    }

    forward() {
      this.history.forward();
      // this.go(window.location.pathname);
    }

    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}

// Необходимо оставить в силу особенностей тренажёра
history.pushState({}, '', '/');

const router = new Router(".app");

// Можно обновиться на /user и получить сразу пользователя
router
  .use("/", Chats)
  .use("/users", Users)
  .start();

// Через секунду контент изменится сам, достаточно дёрнуть переход
setTimeout(() => {
  router.go("/users");
}, 1000);

// А можно и назад
setTimeout(() => {
  router.back();
}, 3000);

// И снова вперёд
setTimeout(() => {
  router.forward();
}, 5000);
