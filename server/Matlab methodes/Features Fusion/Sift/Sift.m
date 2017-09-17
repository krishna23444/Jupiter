function  D=sift(I,J)
    I = single((I)); % Conversion to single is recommended
    J = single((J)); % in the documentation  
    [F1 D1] = vl_sift(I);
    [F2 D2] = vl_sift(J);
    [matches score] = vl_ubcmatch(D1,D2,1.5) ;  
    %    matchesOk = ransac(F1, F2, matches);
    D =score
  end