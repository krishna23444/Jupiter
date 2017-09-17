% Train a net

clf
a1 = axes('position',[.03,.1,.29,.85]);
a2 = axes('position',[.36,.1,.29,.85]);
a3 = axes('position',[.69,.56,.29,.38]);
a4 = axes('position',[.69,.1,.29,.38]);
%a5 = axes('position',[.69,.1,.29,.85]);

for epoch=1:nepochs,
   doepoch;
   plotdata
   epochs = epochs + 1;
   reportresults
end

