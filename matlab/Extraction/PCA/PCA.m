function D = PCA(InputImage,ind, m, ProjectedImages, Eigenpalms)


%%%%%%%%%%%%%%%%%%%%%%%% Extracting the PCA features from test image
%InputImage = imread(TestImage);
temp = InputImage(:,:,1);

[irow icol] = size(temp);
InImage = reshape(temp',irow*icol,1);
Difference = double(InImage)-m; % Centered test image
ProjectedTestImage = Eigenpalms'*Difference; % Test image feature vector

%%%%%%%%%%%%%%%%%%%%%%%% Calculating Euclidean distances 
% Euclidean distances between the projected test image and the projection
% of all centered training images are calculated. Test image is
% supposed to have minimum distance with its corresponding image in the
% training database.

q = ProjectedImages(:,ind);
D= norm(ProjectedTestImage - q)^2;
end