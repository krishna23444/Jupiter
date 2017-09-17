function [scoresF]=fusionScoreSum(scores)
%a=zero(size(scores,1),1);
a=scores{1};
for i=2:size(scores,2)
  a= [scores{i} a];
end
 
scoresF=sum (a')'/size(scores,2);
end