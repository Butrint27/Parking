using AutoMapper;
using backend_dotnet7.Core.Dtos;
using backend_dotnet7.Core.Dtos.Category;
using backend_dotnet7.Core.Dtos.Customer;
using backend_dotnet7.Core.Dtos.Ligjerata;
using backend_dotnet7.Core.Dtos.Ligjeruesi;
using backend_dotnet7.Core.Dtos.Order;
using backend_dotnet7.Core.Dtos.Product;
using backend_dotnet7.Core.Entities;

namespace backend_dotnet7.Core.AutoMapperConfig
{
    public class AutoMapperConfigProfile:Profile 
    {
        public AutoMapperConfigProfile() {

            //Product
            CreateMap<ProductDto, Product>();
            CreateMap<Product,ProductDto>();

            //Category
            CreateMap<CategoryDto, Category>();
            CreateMap<Category, CategoryDto>();

            //Order
            CreateMap<OrderDto,Order>();
            CreateMap<Order,OrderDto>();

            //Customer
            CreateMap<CustomerDto, Customer>();
            CreateMap<Customer, CustomerDto>();

            //Ligjerata
            CreateMap<LigjerataDto, Ligjerata>();
            CreateMap<Ligjerata, LigjerataDto>();

            //Ligjeruesi
            CreateMap<LigjeruesiDto, Ligjeruesi>();
            CreateMap<Ligjeruesi, LigjeruesiDto>();
        }
    }
}
