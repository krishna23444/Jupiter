function sIntraClassDis = getIntraClassDisLin(scans,scan,m, A, Eigenpalms,files,matcherName)
sIntraClassDis=[];
persons=scans/scan;
count=1;
for i=1:persons
for j=1:scan
 img = imread(files{(i-1)*scan+j});
img=im2double(img);
j
%Applying grayscale if color image
if ndims(img) == 3; img = rgb2gray(img); end 
for k=j:scan
    
 matcher=str2func(matcherName);
 sIntraClassDis(count)= matcher(img,(i)*scan+j-k, m, A, Eigenpalms);
count=count+1;
end
end
end