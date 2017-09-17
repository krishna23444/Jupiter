function saveOutPutImage(img,module,dir,name)

psave=strcat(dir,module,'\',name,'.png');
if ~exist(strcat(dir,module),'dir' )
  mkdir(dir,module);
end
imwrite(img,psave); 


end