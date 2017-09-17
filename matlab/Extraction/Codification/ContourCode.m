% ContCode Compute the Multidirectional Feature Encoding (Contour Code Representation) of an Image

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% This function requires 'NSCT Toolbox', installed before use.
% Downloadable from:
% http://www.mathworks.com/matlabcentral/fileexchange/10049
% (Please refer to the Readme.txt of the NSCT toolbox to make it working)
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function C = ContourCode(I)

k=3;
D_f = 'sinc';
P_f = 'pyrexc'; 
n_orient = 2^k; % No. of Orientations
orients = 1:n_orient; % Vector of all Orientations
orient_order = [fliplr(orients(1:n_orient/4)) orients(n_orient/2+1: n_orient) fliplr(orients(n_orient/4+1:n_orient/2))]; % Order of Orientations w.r.t. NSCT subbands
coeffs = nsctdec(I, k, D_f, P_f); % NSCT Decomposition
ordered_coeffs = zeros(numel(I),n_orient);
for i = 1:n_orient % Reordering the Coefficients according to 'orient_order'
    ordered_coeffs(:,i) = coeffs{2}{orient_order(i)}(:);
end

[~,C] = min(ordered_coeffs,[],2); % Index of Subband Corresponding to Minimum Peak repsonse
C = reshape(C,size(I)); % Reshaping to Original Image size
end