p("match,regex",90);var vb=/^\/(.*)\/([gimuy]+)?$/;function wb(a){if(a=a.match(vb)){try{var b=new RegExp(a[1],a[2])}catch(c){}return b||!1}};
