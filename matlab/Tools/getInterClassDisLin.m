function sInterClassDis = getInterClassDisLin(scans,scan,m, A, Eigenpalms,files,matcherName)
sInterClassDis=[];
count=1;
for i=1:(scans/scan)
     img = imread(files{scan*(i-1)+1});
img=im2double(img);
%Applying grayscale if color image
if ndims(img) == 3; img = rgb2gray(img); end 
 for j=i:(scans/scan)-1

matcher=str2func(matcherName);
sInterClassDis(count)= matcher(img,scan*(i)+1, m, A, Eigenpalms);
count=count+1;
end
end