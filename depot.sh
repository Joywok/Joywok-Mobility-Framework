cp build/scripts/* ../../public/scripts/
cp build/styles/* ../../public/styles/
cp build/fonts/* ../../public/fonts/
cp build/images/* ../../public/images/
cd ../../public/scripts/
svn commit -m "launch"
cd ../styles
svn commit -m "launch"
cd ../fonts
svn commit -m "launch"
cd ../images
svn commit -m "launch"
