function bin=BinarisationAdaptive(img)
bin=imbinarize(img,'adaptive','ForegroundPolarity','dark','Sensitivity',0.4);
end