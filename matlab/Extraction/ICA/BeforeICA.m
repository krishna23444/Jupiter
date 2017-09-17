function [m, A, projectimg]=BeforeICA(TrainDatabasePath)
   imgcount = length(TrainDatabasePath );
    X = []; %% N feature vector (p dim) in p * N
    for i = 1 : imgcount
        i
       X = [X , imreadOneD( TrainDatabasePath{i})];
    end

    m = mean(X,2); % compute the mean of feature vectors
    % substract each vector in X with mean in A
    A = []; 
    for i = 1 : imgcount
        A = [A double(X(:,i))-m ];
    end

    projectimg = [];
    [projectimg, Eigenpalms] = fastica(A);
 
end
% imreadOneD: function description
function [outputs] = imreadOneD(imgPath)
	img = imreadGray(imgPath);
	[r c] = size(img);
	outputs = reshape(img',r*c,1);
end


% imreadGray: function description
function [img] = imreadGray(imgPath)
	img = imread(imgPath);
	if (size(img,3) == 3)
		img = rgb2gray(img);
	end

end