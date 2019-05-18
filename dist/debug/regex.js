n("match,regex",86);var qb=/^\/(.*)\/([gimuy]+)?$/;function rb(a){if(a=a.match(qb)){try{var b=new RegExp(a[1],a[2])}catch(c){}return b||!1}};
