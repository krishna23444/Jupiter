% create and initialize network variables

for subnet=1:ninputs
   weight12{subnet} = (rand(nhidden,ninputs+1) - .5) * (2 * weightrange);
   weight23{subnet} = (rand(1,nhidden+1) - .5) * (2 * weightrange);
   weight13{subnet} = (rand(1,ninputs+1) - .5) * (2 * weightrange);
   weight34{subnet} = rand(nextra,2) * weightrange;                 % 34 and 45 have to be positive
   weight45{subnet} = rand(1,nextra+1) * weightrange;
   
   grad12{subnet} = zeros(size(weight12{subnet}));         % not really necessary, except
   grad23{subnet} = zeros(size(weight23{subnet}));         % for the test of grad45{1}
   grad13{subnet} = zeros(size(weight13{subnet}));         % in 'testcost'
   grad34{subnet} = zeros(size(weight34{subnet}));
   grad45{subnet} = zeros(size(weight45{subnet}));
   
   grad12old{subnet} = zeros(size(weight12{subnet}));
   grad23old{subnet} = zeros(size(weight23{subnet}));
   grad13old{subnet} = zeros(size(weight13{subnet}));
   grad34old{subnet} = zeros(size(weight34{subnet}));
   grad45old{subnet} = zeros(size(weight45{subnet}));
   
   z12{subnet} = zeros(size(weight12{subnet}));
   z23{subnet} = zeros(size(weight23{subnet}));
   z13{subnet} = zeros(size(weight13{subnet}));
   z34{subnet} = zeros(size(weight34{subnet}));
   z45{subnet} = zeros(size(weight45{subnet}));
   
   eta12{subnet} = ones(size(weight12{subnet})) * eta013;
   eta23{subnet} = ones(size(weight23{subnet})) * eta013;
   eta13{subnet} = ones(size(weight13{subnet})) * eta013;
   eta34{subnet} = ones(size(weight34{subnet})) * eta0;
   eta45{subnet} = ones(size(weight45{subnet})) * eta0;
end

mincost = 1E20;
cost = mincost;
epochs = 0;
falseepochs = 0;


