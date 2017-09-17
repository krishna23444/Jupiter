function [scoresImpostors , scoresGenuines ]=getScores(url)
[impostor, genuine] = load_raw_scores_labels(url);
eer_=[];
  for i=1:size(impostor,2),
    eer_(i) =  wer(impostor(:,i), genuine(:,i));
  end;
selected=find(eer_(:)<0.3)
disp(size(selected))
for i=1:size(selected)
    %normalisation 
    scoresImpostors{i}=impostor(:,selected(i));
    scoresGenuines{i}=genuine(:,selected(i));

end
end