% Net parameters

ninputs =   2;
nhidden =   10;
noutputs =  2;
nextra = 3;

ntrain = 1000;

initialepochs = 0;

nepochs = 1000000;

ndisp = 5;
ndistr = 100;
ngrid = 21;

weightrange = 1;

wdecayf12 = 0;
wdecayf23 = 0;
wdecayf34 = 0;

eta0 = 1e-6;
eta013 = eta0;    % eta0 for weights between layers 1,2 and 3
up =  1.2;
down = 1/up;
tolerance = 1e-8;  % tolerance is additive because cost is logarithmic
reduce = down;
alpha = .99;

range = .5;
scalef = 2;
for i=1:ninputs
   dataf(i) = 3;
end

