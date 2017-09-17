function D = LDA(InputImage,ind, m_database, V_LDA,Fisher )
V_Fisher=Fisher.V_Fisher;
ProjectedImages_Fisher=Fisher.ProjectedImages_Fisher;
Train_Number = size(ProjectedImages_Fisher,2);
%%%%%%%%%%%%%%%%%%%%%%%% Extracting the LDA features from test image
 temp = InputImage(:,:,1);

[irow icol] = size(temp);
InImage = reshape(temp',irow*icol,1);
Difference = double(InImage)-m_database; % Centered test image
ProjectedTestImage = V_Fisher' * V_LDA' * Difference; % Test image feature vector

%%%%%%%%%%%%%%%%%%%%%%%% Calculating Euclidean distances 
% Euclidean distances between the projected test image and the projection
% of all centered training images are calculated. Test image is
% supposed to have minimum distance with its corresponding image in the
% training database.
     q = ProjectedImages_Fisher(:,ind);
    size(ProjectedTestImage)
     
    D = norm( ProjectedTestImage - q )^2;
 
end