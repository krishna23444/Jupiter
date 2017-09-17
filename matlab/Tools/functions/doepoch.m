% Do an epoch

testcost        % Test whether cost function has improved; if not, backtrack

wadapt          % Adapt weights

arrinit         % Initialize arrays

forward         % Propagate forward

costderiv       % Compute cost function and its derivatives, for backprop

back            % Propagate backwards

compgrad        % Compute gradient relative to weights
