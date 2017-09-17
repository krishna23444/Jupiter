function D = ICA(InputImage,ind, m, A, Eigenpalms)
testimg = imreadOneD(testImgPath);
testimg = double(testimg) - m ; %substract with mean from the training vectors
projtestimg = Eigenpalms * testimg;
projectimg = Eigenpalms* A ;
D =  projectimg(:,ind)-projtestimg;
 end
 
