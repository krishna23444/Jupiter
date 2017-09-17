function binary=BinarisationGlobalMatlab(img)
globalThresh=graythresh(img);
[H W]=size(img);
for i=1:H
    for j=1:W     
        if(img(i,j)>=globalThresh)
            binary(i,j)=1;
        else
            binary(i,j)=0; 
        end
    end
end
