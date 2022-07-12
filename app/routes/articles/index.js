import { DataProxy, Repeater, Rescope } from 'cx/ui';
import { Link } from 'cx/widgets';
import getController from './Controller';

export default () => (
   <cx>
      <Rescope bind="$page" controller={getController()}>
         <div className="p-8 overflow-auto bg-slate-100">
            <div className="my-4">
               <h1 className="text-3xl">Articles</h1>
               {/* <Button text="Add" icon="plus" mod="primary" onClick="addArticle" /> */}
            </div>
            <div className="grid grid-cols-4 grid-rows-3 gap-4">
               <Repeater records-bind="articles" recordAlias="$article" sealed>
                  <Link href-tpl="+/{$article.id}">
                     <Article title-bind="$article.title" author-bind="$article.author" />
                  </Link>
               </Repeater>
            </div>
         </div>
      </Rescope>
   </cx>
);

const Article = ({ title, author }) => (
   <cx>
      <DataProxy
         data={{
            title,
            author,
         }}
      >
         <div
            className={{
               'flex flex-col justify-between p-2 drop-shadow-sm': true,
               'bg-white border-2 rounded-md h-full': true,
               'opacity-90 hover:opacity-100 hover:drop-shadow-md hover:scale-105 transition-all duration-200': true,
            }}
         >
            <div>
               <img
                  className="w-full"
                  src="https://as1.ftcdn.net/v2/jpg/01/20/86/26/1000_F_120862615_YSKy9jVN4hG1WpiqIgWN44fui9fbn1kB.jpg"
               />
            </div>

            <div className="mt-5">
               <h3 className="text-gray-800" text-bind="title" />
               <h6 className="mt-2 text-sm text-right text-gray-500" text-tpl="Author: {author}" />
            </div>
         </div>
      </DataProxy>
   </cx>
);
