type RouteParams = {
    user: { id: string | number };
    inventory: { id: string | number };
  };
  
  const routesConfig = {
    auth: {
      login: "/login",
      registration: "/registration",
    },  
    main: {
      home: "/",
    },  
    user: {
      profile: "/user/:id",
      getProfile: (id: RouteParams["user"]["id"]) => `/user/${id}`,
    },  
    inventory: {
      item: "/inventory/:id",
      getItem: (id: RouteParams["inventory"]["id"]) => `/inventory/${id}`,
    },
  };
  
  export default routesConfig;