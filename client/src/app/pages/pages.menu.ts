export const PAGES_MENU = [
{
  path: '',
  children: [
  {
    path: 'tests',
    data: {
      menu: {
        title: 'Tests',
        icon: 'ion-ios-play',
        selected: true,
        expanded: false,
        order: 0
      }
    } 
  },{
    path: 'resources',
    data: {
      menu: {
        title: 'Resources',
        icon: 'ion-ios-filing',
        selected: false,
        expanded: false,
        order: 100,
      }
    }  
  },
  {
    path: 'methods',
    data: {
      menu: {
        title: 'Methods',
        icon: 'ion-ios-paper',
        selected: false,
        expanded: false,
        order: 0
      }
    }
  },{
    path: 'results',
    data: {
      menu: {
        title: 'Results',
        icon: 'ion-ios-pulse-strong',
        selected: false,
        expanded: false,
        order: 0
      }
    }
  }, {
    path: 'logs',
    data: {
      menu: {
        title: 'Logs',
        icon: 'ion-ios-alarm',
        selected: false,
        expanded: false,
        order: 0
      }
    }
  },{
    path: 'faq',
    data: {
      menu: {
        title: 'FAQ',
        icon: 'ion-ios-information',
        selected: false,
        expanded: false,
        order: 0
      }
    }
  }
  ]
}
];
