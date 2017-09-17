function [scoresF]=fusionScoreProduct(scores)
%a=zero(size(scores,1),1);
a=scores{1};
for i=2:size(scores,2)
  a= [scores{i} a];
end
 
scoresF=prod(a,2)

end