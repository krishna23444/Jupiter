function [m, ProjectedImages, Eigenpalms]=BeforePCA(TrainDatabasePath)
ProjectedImages=[];
T = CreateDatabase(TrainDatabasePath);
[m, A, Eigenpalms] = palm(T);
Train_Number = size(Eigenpalms,2);
for i = 1 : Train_Number
    temp = Eigenpalms'*A(:,i); % Projection of centered images into palmspace
    ProjectedImages = [ProjectedImages temp]; 
end
end

function T = CreateDatabase(TrainFiles)
%TrainFiles = dir(TrainDatabasePath);
Train_Number = length(TrainFiles);%number of files
%%%%%%%%%%%%%%%%%%%%%%%% Construction of 2D matrix from 1D image vectors
T = [];
for i = 1 : Train_Number
    
 
    img = imread(TrainFiles{i});
    %img = rgb2gray(img);
    
    [irow icol] = size(img);
   
    temp = reshape(img',irow*icol,1);   % Reshaping 2D images into 1D image vectors
     T = [T temp]; % 'T' grows after each turn   
      
end
 
end
%---------------------------PALM-------------------------%
function [m, A, Eigenpalms] = palm(T)
m = mean(T,2); % Computing the average palm image m = (1/P)*sum(Tj's)    (j = 1 : P)
Train_Number = size(T,2);

%%%%%%%%%%%%%%%%%%%%%%%% Calculating the deviation of each image from mean image
A = [];  
for i = 1 : Train_Number
    temp = double(T(:,i)) - m; % Computing the difference image for each image in the training set Ai = Ti - m
    A = [A temp]; % Merging all centered images
end

%%%%%%%%%%%%%%%%%%%%%%%% Snapshot method of Eigenpalm methos
% We know from linear algebra theory that for a PxQ matrix, the maximum
% number of non-zero eigenvalues that the matrix can have is min(P-1,Q-1).
% Since the number of training images (P) is usually less than the number
% of pixels (M*N), the most non-zero eigenvalues that can be found are equal
% to P-1. So we can calculate eigenvalues of A'*A (a PxP matrix) instead of
% A*A' (a M*NxM*N matrix). It is clear that the dimensions of A*A' is much
% larger that A'*A. So the dimensionality will decrease.

L = A'*A; % L is the surrogate of covariance matrix C=A*A'.
[V D] = eig(L); % Diagonal elements of D are the eigenvalues for both L=A'*A and C=A*A'.

%%%%%%%%%%%%%%%%%%%%%%%% Sorting and eliminating eigenvalues
% All eigenvalues of matrix L are sorted and those who are less than a
% specified threshold, are eliminated. So the number of non-zero
% eigenvectors may be less than (P-1).
 
L_eig_vec = [];
for i = 1 : size(V,2) 
    %if( D(i,i)>1 )
        L_eig_vec = [L_eig_vec V(:,i)];
        
    %end
    
end

%%%%%%%%%%%%%%%%%%%%%%%% Calculating the eigenvectors of covariance matrix 'C'
% Eigenvectors of covariance matrix C (or so-called "Eigenpalms")
% can be recovered from L's eiegnvectors.
Eigenpalms = A * L_eig_vec; % A: centered image vectors

 
end