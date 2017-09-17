function final_image=BinarisationGlobal(enhanced)
[m n]=size(enhanced);
%binarization
J=size(m,n);
for i=1:m
    for j=1:n
        if enhanced(i,j)<=0
            J(i,j)=0;
        elseif enhanced(i,j)>0
            J(i,j)=1;
        end
        
    end
end
   final_image=J;
  
end
