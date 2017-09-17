% Propagate forward

output1g = trpatterng;
output1g(ninputs+1,:) = 1;
input21g = weight12{1} * output1g;
input22g = weight12{2} * output1g;
%output21g = tanh(input21g);
%output22g = tanh(input22g);
output21g = (2/pi) * atan(input21g);
output22g = (2/pi) * atan(input22g);
output21g(nhidden+1,:) = 1;
output22g(nhidden+1,:) = 1;
input3g = [weight23{1} * output21g; weight23{2} * output22g] + [weight13{1} * output1g; weight13{2} * output1g;];
output31g = input3g(1,:);
output32g = input3g(2,:);
output31g(2,:) = 1;
output32g(2,:) = 1;
input41g = weight34{1} * output31g;
input42g = weight34{2} * output32g;
output41g = tanh(input41g);
output42g = tanh(input42g);
%output41g = (2/pi) * atan(input41g);
%output42g = (2/pi) * atan(input42g);
output41g(nextra+1,:) = 0;
output42g(nextra+1,:) = 0;
input5g = [weight45{1} * output41g;
          weight45{2} * output42g];
outputg = input5g;

