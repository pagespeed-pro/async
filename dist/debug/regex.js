n("match,regex",90);var sb=/^\/(.*)\/([gimuy]+)?$/;function tb(a){if(a=a.match(sb)){try{var b=new RegExp(a[1],a[2])}catch(c){}return b||!1}};
