% if abs(dataf) > 1, warning('abs(dataf) > 1, generating complex values'); end
% trpattern = atanh(2 * dataf * (rand(ninputs,ntrain) - .5)) / dataf;

% trpattern = 2 * (rand(ninputs,ntrain) - .5);
% trpattern = sign(trpattern) .* (abs(trpattern) .^ dataf);

for i=1:ninputs
   trpatternaux(i,:) = 2 * range * (rand(1,ntrain) - .5);
   trpatternaux(i,:) = sign(trpatternaux(i,:)) .* abs(atanh(trpatternaux(i,:))) .^ dataf(i);
end

aux = trpatternaux;

if dataf(1) < 1
   trpatternaux(1,:) = trpatternaux(1,:) + trpatternaux(2,:);
   trpatternaux(2,:) = trpatternaux(1,:) - 2 * trpatternaux(2,:);
end

clear trpattern
clear trpatterng

trpattern(1,:) = trpatternaux(1,:) + (scalef * abs(trpatternaux(2,:)) .^ 2);
trpattern(2,:) = trpatternaux(2,:) + (scalef * abs(trpatternaux(1,:)) .^ 2);

% Generate grid

ngrid2 = ngrid ^ 2;

i=1:ngrid;
gridptaux = 2 * range * ((2 * i - 1) / (2 * ngrid) - .5);

npt = 1;
for i=1:ngrid
   for j=1:ngrid
      trpatternauxg(1,npt) = gridptaux(i);
      trpatternauxg(2,npt) = gridptaux(j);
      npt = npt + 1;
   end
end

for i=1:ninputs
   trpatternauxg(i,:) = sign(trpatternauxg(i,:)) .* abs(atanh(trpatternauxg(i,:))) .^ dataf(i);
end

if dataf(1) < 1
   trpatternauxg(1,:) = trpatternauxg(1,:) + trpatternauxg(2,:);
   trpatternauxg(2,:) = trpatternauxg(1,:) - 2 * trpatternauxg(2,:);
end

trpatterng(1,:) = trpatternauxg(1,:) + (scalef * abs(trpatternauxg(2,:)) .^ 2);
trpatterng(2,:) = trpatternauxg(2,:) + (scalef * abs(trpatternauxg(1,:)) .^ 2);

%Normalize

trpatterng = 0.1 * trpatterng / max(max(trpattern));
trpattern = 0.1 * trpattern / max(max(trpattern));

clear trpatternauxg;
clear trpatternaux;

