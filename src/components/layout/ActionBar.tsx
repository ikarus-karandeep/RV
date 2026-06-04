import React from 'react';
import { Button } from '../common/Button';

export const ActionBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 right-0 p-[24px] flex gap-[12px] items-start z-20 bg-gradient-to-t from-gray-100/50 to-transparent w-[500px] justify-end">
      <Button variant="primary" size="lg" className="w-[426px]">
        build summary
      </Button>
      <div className="bg-white rounded-[12px] size-[106px] h-[87px] flex items-center justify-center cursor-pointer hover:bg-gray-50 shadow-md">
        <img 
          src="https://www.figma.com/api/mcp/asset/2065ef92-1177-4ca1-80a9-29fd2f292377" 
          alt="Help" 
          className="size-[25px]" 
        />
      </div>
    </div>
  );
};
