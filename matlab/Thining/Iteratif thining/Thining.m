function ims=Thining(im)
ims=bwmorph(~im,'thin','inf');
end