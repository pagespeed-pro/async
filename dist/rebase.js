var qb=/^(((http(s)?)?:)?\/)?\//i;qa=function(a,b){var c=a[1],d=a[2];a=a[0][46]||c[46];d&&a&&!qb.test(d)&&b(a+d)};
