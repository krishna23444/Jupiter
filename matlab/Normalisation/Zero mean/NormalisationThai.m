%Adapted from Raymond Thai, "Fingerprint Image Enhacement and Minutiae
%Extraction" section 2.2.2
function [ normalizedImage ] = NormalisationThai(originalImage)
desiredMean=0;
desiredVar=1;
meanImage = mean(originalImage(:));
normalizedImage = (originalImage - meanImage)/std(originalImage(:));
normalizedImage = normalizedImage*sqrt(desiredVar);
m = find(originalImage <= meanImage);
p = find(originalImage > meanImage);
normalizedImage(m) = desiredMean - normalizedImage(m);
normalizedImage(p) = desiredMean + normalizedImage(p);
end

