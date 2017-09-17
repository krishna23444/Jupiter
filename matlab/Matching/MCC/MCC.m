function score=MCC(F1, F2)
 F1(:,3)=[]; % we don't need the third collumn 
 F2(:,3)=[];
asm=NET.addAssembly(fullfile('C:\Mcc\Sdk\MccSdk.dll'));
%Sets from an XML file the MCC enroll parameters.
BioLab.Biometrics.Mcc.Sdk.MccSdk.SetMccEnrollParameters('C:\Mcc\Sdk\MccPaperEnrollParameters.xml');
% %Loads a MCC Template from a text format file.
% a=[];
%  f=F1;
%  f=horzcat(f(1:end,1:3-1),f(1:end,3+1:end));
%  a=f;
%  a
%  b=[];
%  f=F2;
%  f=horzcat(f(1:end,1:3-1),f(1:end,3+1:end));
%  b=f;
 template1=BioLab.Biometrics.Mcc.Sdk.MccSdk.CreateMccTemplate(364,256,500,MccMinuteas(F1));
%BioLab.Biometrics.Mcc.Sdk.MccSdk.SaveMccTemplateToTextFile(template1,'stupid.txt't1)
%template1=BioLab.Biometrics.Mcc.Sdk.MccSdk.CreateMccTemplate(info1.Width,info1.Height,info1.XResolution,minutiaes1);
%Creates a MCC Template starting from the minutiae stored in a file
%using the ISO standard format.
template2=BioLab.Biometrics.Mcc.Sdk.MccSdk.CreateMccTemplate(364,256,500,MccMinuteas(F2));
%Sets from an XML file the MCC match parameters.
BioLab.Biometrics.Mcc.Sdk.MccSdk.SetMccMatchParameters('C:\Mcc\Sdk\MccPaperMatchParameters.xml')
%Matches the two MCC Templates.
score = BioLab.Biometrics.Mcc.Sdk.MccSdk.MatchMccTemplates(template1, template2);
%Writes the matching score to the console.
   
end