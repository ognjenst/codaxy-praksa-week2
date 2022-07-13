import { Icon, Link, PureContainer } from 'cx/widgets';

const NavItem = ({ text, href, tooltip, onClick, className, icon, badge, expanded }) => (
   <cx>
      <Link
         href={href}
         url-bind="url"
         class="hover:bg-gray-100 flex items-center px-3 py-3 text-gray-800 relative font-semibold whitespace-nowrap text-opacity-70 text-[15px] border-l-[3px] border-transparent cursor-pointer"
         className={className}
         activeClass="!bg-blue-100 !border-blue-500 !text-blue-500 !opacity-100"
         tooltip={tooltip}
         onClick={onClick}
         match="subroute"
      >
         <Icon name={icon} class="w-7 h-7 ml-3 mr-3 opacity-70" />
         <div text={text} class="flex-grow" />
         <div text={badge} visible={badge} class="text-xs bg-black bg-opacity-20 rounded-full px-3 py-1" />
         <Icon
            name="drop-down"
            class="w-5 h-5 mr-2 transform transition-all opacity-80"
            visible={!!expanded}
            className={{
               'rotate-180': expanded,
            }}
         />
      </Link>
   </cx>
);

const GroupItem = ({ text, href, tooltip, className, icon, badge, children, expanded }) => (
   <cx>
      <NavItem
         href={href}
         text={text}
         tooltip={tooltip}
         className={className}
         icon={icon}
         badge={badge}
         onClick={(e, { store }) => {
            e.preventDefault();
            store.toggle(expanded.bind);
         }}
         expanded={expanded}
      />
      <PureContainer visible={expanded}>{children}</PureContainer>
   </cx>
);

const ChildItem = ({ text, href, badge }) => (
   <cx>
      <NavItem href={href} text={text} className="!pl-16 opacity-80" badge={badge} />
   </cx>
);

export const Navigation = ({ name }) => (
   <cx>
      <div class="border-r pt-3">
         <div class="px-6 py-3 text-gray-400 text-sm">Main Menu</div>

         <NavItem text="Products" icon="view-list" href="~/products" />

         <NavItem text="Window" icon="desktop-computer" href="~/window" />

         <NavItem text="Articles" icon="newspaper" href="~/articles" />
         <NavItem text="Praksa" icon="user" href="~/praksa" />

         <NavItem text="Dashboard" icon="chart-bar" href="~/dashboard" />
         <NavItem text="Invoices" icon="document-text" href="~/invoices" />
         <NavItem text="Customers" icon="users" href="~/customers" />

         <div class="mt-4 px-6 py-3 text-gray-400 text-sm">Administration</div>
         <NavItem text="Settings" icon="cog" href="~/settings" />
         <NavItem text="User Accounts" icon="user-group" href="~/users" />

         <div class="mt-4 px-6 py-3 text-gray-400 text-sm">Misc</div>

         <GroupItem text="Pages" icon="document-report" expanded-bind="nav.expand.pages">
            <ChildItem text="Sign In" href="~/pages/sign-in" />
            <ChildItem text="Password Recovery" href="~/pages/password-recovery" />
         </GroupItem>
         <GroupItem text="Widgets" icon="puzzle" expanded-bind="nav.expand.widgets">
            <ChildItem text="Buttons" href="~/widgets/buttons" />
            <ChildItem text="Form Fields" href="~/widgets/form-fields" />
            <ChildItem text="Rich Text Editor" href="~/widgets/rich-text" />
         </GroupItem>
         <NavItem text="About" icon="information-circle" href="~/about" />
      </div>
   </cx>
);
