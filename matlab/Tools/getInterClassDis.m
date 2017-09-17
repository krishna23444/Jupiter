function sInterClassDis = getInterClassDis(scans,scan,features,matcherName)
sIntraClassDis=[];
count=1;
for i=1:(scans/scan)
 a=features{scan*(i-1)+1};
for j=i:(scans/scan)-1
b=features{scan*(i)+1};
 matcher=str2func(matcherName);
sInterClassDis(count)=matcher(a,b);
count=count+1;
end
end