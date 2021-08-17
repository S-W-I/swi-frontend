#!/bin/bash


npm run build
npm run export

tar -czvf frontend.tar.gz out