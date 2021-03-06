% Propagate forward

output1(1:ninputs,:) = trpattern;

for subnet=1:ninputs
   input2{subnet} = weight12{subnet} * output1;
   %output2{subnet}(1:nhidden,:) = tanh(input2{subnet});           % for tanh sigmoids
   output2{subnet}(1:nhidden,:) = (2/pi) * atan(input2{subnet});   % for arctangent sigmoids

   input3{subnet} = weight23{subnet} * output2{subnet} + weight13{subnet} * output1;
   output3{subnet}(1,:) = input3{subnet};
   input4{subnet} = weight34{subnet} * output3{subnet};
   %output4{subnet}(1:nextra,:) = tanh(input4{subnet});            % for tanh sigmoids
   output4{subnet}(1:nextra,:) = (2/pi) * atan(input4{subnet});    % for arctangent sigmoids

   output{subnet} = weight45{subnet} * output4{subnet};
end
