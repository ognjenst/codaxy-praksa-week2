import { computable, History } from 'cx/ui';
import { Dropdown, HighlightedSearchText, Icon, List, Menu, MenuItem, TextField } from 'cx/widgets';
import { Logo2 } from '../components/Logo2';
import { Navigation } from '../components/Navigation';
import Controller from './Controller';

export const CheckerLayout = ({ children, nav }) => (
   <cx>
      <div
         class="h-full grid grid-cols-2 grid-rows-2"
         style="grid-template-columns: 250px 1fr; grid-template-rows: auto 1fr"
         controller={Controller}
      >
         <div class="border-r border-b py-2 pl-6 flex">
            <Logo2 />
         </div>
         <div class="border-b flex">
            <div class="flex-grow">
               <TextField
                  icon="search"
                  placeholder="Search customers, invoices, ..."
                  class="h-full w-full"
                  inputClass="border-transparent rounded-none"
                  focused={{ bind: 'search.visible', debounce: 300 }}
                  trackFocus
                  inputAttrs={{ autoComplete: 'off' }}
                  value={{ bind: 'search.query', debounce: 300 }}
               />
               <Dropdown
                  visible-expr="{search.visible} && {search.query} && {search.results}"
                  offset={5}
                  placementOrder={'down-right'}
                  arrow
                  class="p-4 w-[600px]"
                  matchWidth={false}
               >
                  <div class="text-gray-500 p-4 italic" visible-expr="!{search.results.length}">
                     Could not find any results matching the search query{' '}
                     <span text-bind="search.query" class="font-bold" />.
                  </div>
                  <List
                     records-bind="search.results"
                     itemPad={false}
                     onItemClick={(e, { store }) => {
                        History.pushState({}, null, store.get('$record.url'));
                        store.delete('search');
                     }}
                     grouping={{
                        key: {
                           type: { bind: '$record.type' },
                        },
                        header: (
                           <cx>
                              <div text-bind="$group.type" class="uppercase text-gray-400 text-xs py-1" />
                           </cx>
                        ),
                     }}
                  >
                     <div class="flex p-2 items-center">
                        <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                           <Icon
                              name={computable('$record.type', (type) => {
                                 switch (type) {
                                    case 'customer':
                                       return 'users';
                                    default:
                                    case 'invoice':
                                       return 'document-text';
                                 }
                              })}
                              class="w-6 h-6"
                           />
                        </div>
                        <div class="ml-4">
                           <div class="text-base">
                              <HighlightedSearchText text-bind="$record.title" query-bind="search.query" />
                           </div>
                           <div class="text-gray-400">
                              <HighlightedSearchText text-bind="$record.text" query-bind="search.query" />
                           </div>
                        </div>
                     </div>
                  </List>
               </Dropdown>
            </div>
            <div
               class="border-l"
               onClick={(e, { store }) => {
                  store.toggle('nav.expand.user');
               }}
               tabIndex="0"
            >
               <div class="flex items-center px-4 py-2 cursor-pointer">
                  <div class="w-10 h-10 bg-gray-300 rounded-full align-middle flex items-center justify-center relative flex-shrink-0 cursor-pointer">
                     <span text-bind="user.initials" visible-expr="!{user.pictureUrl}" />
                     <img
                        src-tpl="{user.pictureUrl}"
                        visible-expr="!!{user.pictureUrl}"
                        class="w-full h-full object-cover rounded-full absolute left-0 top-0"
                     />
                  </div>
                  <div class="ml-4 mr-4 leading-tight">
                     <div text-tpl="{user.firstName} {user.lastName}">Test</div>
                     <div class="opacity-50 text-sm" text-bind="user.email" />
                  </div>
                  <Icon
                     name="drop-down"
                     class="w-4 h-4 transform transition-all opacity-50"
                     className={{
                        'rotate-180': { bind: 'nav.expand.user' },
                     }}
                  />
               </div>
               <Dropdown
                  visible-bind="nav.expand.user"
                  dismissOnFocusOut
                  arrow
                  offset={5}
                  focusable
                  autoFocus
                  placementOrder={'down-left'}
               >
                  <Menu class="m-2">
                     <MenuItem onClick="onSignOut">Sign Out</MenuItem>
                  </Menu>
               </Dropdown>
            </div>
         </div>
         <Navigation />
         {children}
      </div>
   </cx>
);
