n("match,regex",90);var rb=/^\/(.*)\/([gimuy]+)?$/;function tb(a){if(a=a.match(rb)){try{var b=new RegExp(a[1],a[2])}catch(c){}return b||!1}};
