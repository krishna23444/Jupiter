function sIntraClassDis = getIntraClassDisP(scans,scan,features,matcherName)
sIntraClassDis=[];
persons=scans/scan;
count=1;
for i=1:persons

for j=1:scan
 
 a=features{(i-1)*scan+j};
 for k=j:scan
 
 b=features{(i)*scan+j-k};
 matcher=str2func(matcherName);
sIntraClassDis(count)=matcher(a,b);
count=count+1;
end
end
end