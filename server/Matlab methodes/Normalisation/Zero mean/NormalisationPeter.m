% Copyright (c) 1996-2005 Peter Kovesi
% School of Computer Science & Software Engineering
% The University of Western Australia
% January 2005 
function n = NormalisationPeter(im)                   
	    if ~isa(im,'double'), im = double(im); end
	    n = im - min(im(:));
	    n = n/max(n(:));
end
    