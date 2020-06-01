n("match,regex",90);var ab=/^\/(.*)\/([gimuy]+)?$/;function cb(a){if(a=a.match(ab)){try{var b=new RegExp(a[1],a[2])}catch(c){}return b||!1}};
