% Peter Kovesi  
% School of Computer Science & Software Engineering
% The University of Western Australia
% pk at csse uwa edu au
% January 2005
function [normim,mask] = SegmentationPeter(im)
     blksze = 5;   thresh = 0.085; 
    fun = inline('std(x(:))*ones(size(x))');
    stddevim = blkproc(im, [blksze blksze], fun);
    mask = stddevim > thresh;
    maskind = find(mask);
    im = im - mean(im(maskind));
    normim = im/std(im(maskind));   
end