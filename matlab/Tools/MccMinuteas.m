function S=MccMinuteas(a)

 S = NET.createArray('BioLab.Biometrics.Mcc.Sdk.Minutia',size(a,1));
  for i=1:size(a,1)
L = BioLab.Biometrics.Mcc.Sdk.Minutia();
L.X =a(i,1);
L.Y = a(i,2);
L.Direction = a(i,3); 
S(i)=L;
  end

end