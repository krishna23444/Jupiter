function features=ReadDBFusion(url,scans)

fif = fopen(url);
for i=1:38
    for j=1:scans
   Fe_2(j,i)= fscanf(fif,'%f',1);
    end
end
fclose(fif);%Now close the file.
for i=1:scans
    for j=1:38
      b(j)=Fe_2(i,j);
    end
    features{i}=b;
end
end