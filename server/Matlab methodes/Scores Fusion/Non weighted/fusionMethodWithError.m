function result=fusionMethodWithError(scores)

a=scores{1};
for i=2:size(scores,2)
  a= [scores{i} a];
end
 
scoresF=max(scoresVar,[],2);
end